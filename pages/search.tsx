import { Article, ArticleRoot, portType, postType, User } from "../lib/types";
import { useAmp } from "next/amp";
import { useEffect, useState } from "react";
import { IconSearch, IconFilter } from "@tabler/icons";
import Link from "next/link";
import PostList from "../components/postList";
import News from "../components/news";
import { Modal, TextInput } from "@mantine/core";

export type testPage = {
  test: string;
};
export default function Search({ test, search }: any) {
  const [userData, setUserData] = useState<User[]>();
  const [postData, setPostData] = useState<postType[]>();
  const [searchValue, setSearchValue] = useState<string>();
  const [searchType, setSearchType] = useState<string>("name");
  const [articleData, setArticleData] = useState<ArticleRoot>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    fetch(`./api/search/${searchType}/${test}`)
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, [search]);

  const handleSearch = async () => {
    try {
      await fetch(`./api/search/${searchType}/${searchValue}`)
        .then((res) => res.json())
        .then((data) => {
          switch (searchType) {
            case "news":
              setArticleData(data);
              break;
            case "posts":
              setPostData(data);
              break;
            default:
              setUserData(data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const [portSize, setPortSize] = useState<portType>({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    if (typeof window !== "undefined") {
      setPortSize({
        height: window?.innerHeight,
        width: window?.innerWidth,
      });
    }
  };
  useEffect(() => {
    handleResize();
    window?.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (portSize?.width! > 860) {
    return (
      <main className="mt-24 h-screen w-screen">
        <section className="h-full w-1/4 ml-5">
          <div className="flex mt-5 items-center">
            <input
              className="bg-white h-8 w-40 mr-5 rounded-lg"
              value={searchValue}
              onChange={(event) => setSearchValue(event?.target.value)}
              placeholder={test}
            />
            <IconSearch size={20} onClick={handleSearch} />
          </div>
          <div className="flex flex-col items-start">
            <button
              className="btn btn-primary w-1/2 mt-5 focus:bg-secondary focus:ring"
              onClick={() => setSearchType("name")}
            >
              People
            </button>
            <button
              className="btn btn-primary w-1/2 mt-5 focus:bg-secondary focus:ring"
              onClick={() => setSearchType("posts")}
            >
              Posts
            </button>
            <button
              className="btn btn-primary w-1/2 mt-5 focus:bg-secondary focus:ring"
              onClick={() => setSearchType("news")}
            >
              News
            </button>
          </div>
        </section>

        {searchType === "name" ? (
          <section className="h-full overflow-y-auto">
            <h1 className="text-center text-info">User Search Results:</h1>
            {userData?.length! <= 0 ? (
              <h1>
                No results found with {test === "" ? searchValue : test}, please
                change name or try other categories
              </h1>
            ) : (
              userData?.map((user: User) => {
                return (
                  <Link
                    href={`../userProfile/${user.id}${user.fName}${user.lName}${user.id}69`}
                  >
                    <div className="cursor-pointer flex items-center mt-5 h-20 bg-base-content w-96 rounded-lg ">
                      <img
                        className="w-14 h-14 rounded-full mr-5 ml-5"
                        src={user.image}
                      />
                      <h1>{user.fName + " " + user.lName}</h1>
                    </div>
                  </Link>
                );
              })
            )}
          </section>
        ) : null}
        {searchType === "posts" ? (
          <section className="h-full">
            <h1 className="text-center text-info">Post Results:</h1>
            {postData?.length! <= 0 ? (
              <h1>
                No results found with {searchValue}, please change name or try
                other categories
              </h1>
            ) : (
              <PostList postData={postData!} setPostData={setPostData} />
            )}
          </section>
        ) : null}

        {searchType === "news" ? (
          <section className="h-full">
            <h1 className="text-center text-info">News Results:</h1>
            {articleData?.articles?.length! <= 0 ? (
              <h1>
                No results found with {searchValue}, please change name or try
                other categories
              </h1>
            ) : (
              <News news={articleData!} />
            )}
          </section>
        ) : null}
      </main>
    );
  } else {
    return (
      <main className="mb-24 h-screen w-screen flex">
        {searchType === "name" ? (
          <section className="h-full overflow-y-auto">
            <h1 className="text-center text-info">User Search Results:</h1>
            {userData?.length! <= 0 ? (
              <h1>
                No results found with {test === "" ? searchValue : test}, please
                change name or try other categories
              </h1>
            ) : (
              userData?.map((user: User) => {
                return (
                  <Link
                    href={`../userProfile/${user.id}${user.fName}${user.lName}${user.id}69`}
                  >
                    <div className="cursor-pointer flex items-center mt-5 h-20 bg-base-content w-96 rounded-lg ">
                      <img
                        className="w-14 h-14 rounded-full mr-5 ml-5"
                        src={user.image}
                      />
                      <h1>{user.fName + " " + user.lName}</h1>
                    </div>
                  </Link>
                );
              })
            )}
          </section>
        ) : null}
        {searchType === "posts" ? (
          <section className="h-full">
            <h1 className="text-center text-info">Post Results:</h1>
            {postData?.length! <= 0 ? (
              <h1>
                No results found with {searchValue}, please change name or try
                other categories
              </h1>
            ) : (
              <PostList postData={postData!} setPostData={setPostData} />
            )}
          </section>
        ) : null}

        {searchType === "news" ? (
          <section className="h-full">
            <h1 className="text-center text-info">News Results:</h1>
            {articleData?.articles?.length! <= 0 ? (
              <h1>
                No results found with {searchValue}, please change name or try
                other categories
              </h1>
            ) : (
              <News news={articleData!} />
            )}
          </section>
        ) : null}

        <aside
          onClick={() => setOpenModal(true)}
          className="fixed bottom-0 mb-28 w-12 h-12 rounded-xl bg-primary flex flex-col items-center"
        >
          <IconFilter size={28} onClick={handleSearch} />
          <h4>filter</h4>
        </aside>
        <Modal
          transition="fade"
          transitionDuration={600}
          transitionTimingFunction="ease"
          opened={openModal}
          onClose={() => setOpenModal(false)}
        >
          <section className="h-full w-full flex flex-col items-center">
            <div className="flex w-full justify-center">
              <button
                className="btn btn-primary w-1/3 mr-2 focus:bg-secondary focus:ring"
                onClick={() => setSearchType("name")}
              >
                People
              </button>
              <button
                className="btn btn-primary w-1/3 mr-2 focus:bg-secondary focus:ring"
                onClick={() => setSearchType("posts")}
              >
                Posts
              </button>
              <button
                className="btn btn-primary w-1/3 focus:bg-secondary focus:ring"
                onClick={() => setSearchType("news")}
              >
                News
              </button>
            </div>
            <div className="flex mt-5 items-center">
              <TextInput
                className="bg-white h-10 w-56 mr-5 rounded-lg"
                value={searchValue}
                onChange={(event) => setSearchValue(event?.target.value)}
                placeholder={test}
              />
              <IconSearch size={20} onClick={handleSearch} />
            </div>
          </section>
        </Modal>
        {/* put into a menu or modal */}
      </main>
    );
  }
}
