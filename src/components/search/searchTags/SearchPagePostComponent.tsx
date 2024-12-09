import { NavLink } from "react-router-dom";
import search from "../../../assets/icons/Frame.svg";
import { useCallback, useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import SearchToggleMenu from "../SearchToggleMenu";
import SearchTermDisplay from "../SearchTermDisplay";
import { FetchTagsSerachSuggestion } from "./FetchTagsSerachSuggestion";
import SearchHistory from "../SearchHistory";
import { BeatLoader } from "react-spinners";
import SearchTagSuggestion from "./SearchTagSuggestion";
import { toast } from "react-toastify";
import { FetchPostsSerach } from "./FetchPostsSerach";
import { useInView } from "react-intersection-observer";
import ModalTemplatePost from "../../Posts/ModalTemplatePost";
import ShowPostModal from "../../Posts/ShowPostModal";
import { Posts } from "../Interfaces";

export default function SearchPagePeopleComponent() {
  const [searchPostsInput, setSearchPostsInput] = useState<string>("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [showPostModal, setPostShowModal] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string>("");
  const [showSearchTerm, setShowSearchTerm] = useState(false);
  const [isToggleMenuClicked, setIsToggleMenuClicked] = useState(false);
  const [searchStoredTags, setSearchStoredTags] = useState<string[]>([]);
  const { ref, inView } = useInView();
  const token: string = localStorage.getItem("token") ?? "";

  const {
    data: searchPostData,
    fetchNextPage: fetchNextPageSearchPost,
    hasNextPage: hasNextPageSearchPost,
    isFetching: isFetchingSearchPost,
    isError: searchPostIsError,
    error: searchPostCardError,
    refetch: searchPostRefetch,
  } = useInfiniteQuery({
    queryKey: ["searchPeopleCard", searchPostsInput],
    queryFn: async ({ pageParam = 1 }) =>
      FetchPostsSerach({ pageParam }, token, searchPostsInput),
    getNextPageParam: (lastPage) => {
      return lastPage?.data?.nextPage ?? undefined;
    },
    initialPageParam: 1,
    enabled: !!token && !!showSearchTerm,
  });

  const fetchPostsSuggestions = async () => {
    if (!searchPostsInput || searchPostsInput.length < 2) {
      return [];
    }
    return FetchTagsSerachSuggestion(token, searchPostsInput) ?? [];
  };

  const {
    //suggestion
    data: searchTagsData,
    isError: searchTagsDataIsError,
    isFetching: searchTagsDataIsFetching,
    refetch: searchTagsRefetch,
  } = useQuery({
    queryKey: ["searchPostsSuggestion", searchPostsInput],
    queryFn: fetchPostsSuggestions,
    enabled: searchPostsInput.length >= 2,
    staleTime: 5000,
  });

  const handleSearchDebounce = useCallback(
    debounce((value: string) => {
      setSearchPostsInput(value);
      if (value) {
        searchTagsRefetch();
      }
    }, 900),
    [searchTagsRefetch], //Dependecy
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      setShowDropDown(value.length >= 2);
    }
    if (value.length >= 2) {
      handleSearchDebounce(value);
    }
  };

  const handleFocus = () => {
    if (searchPostsInput) {
      setShowDropDown(true);
    }
  };

  useEffect(() => {
    if (searchTagsData && searchTagsData.length > 0) {
      setShowDropDown(true);
    }
  }, [searchTagsData]);

  // const handleSelectHistoryTerm = async (tag: string) => {
  //   setSearchPostsInput(tag);
  //   await searchPostRefetch();
  //   setShowSearchTerm(true);
  //   setShowDropDown(false);
  // };

  const handleTagsSearchResult = () => {
    setIsToggleMenuClicked((prevState) => !prevState);
    setShowDropDown(false);
    setShowSearchTerm(true);
  };

  const handleSelectTag = async (tag: string) => {
    const storedTags = JSON.parse(localStorage.getItem("searchedTags") || "[]");

    if (!storedTags.includes(tag)) {
      const updatedStoredTags = [...storedTags, tag];
      localStorage.setItem("searchedTags", JSON.stringify(updatedStoredTags));
    }
    try {
      await searchPostRefetch();
    } finally {
      setShowDropDown(false);
      setShowSearchTerm(true);
    }
  };

  const handleSelectHistoryTerm = (tag: string) => {
    setSearchPostsInput(tag);
    setIsToggleMenuClicked((prevState) => !prevState);
    setShowDropDown(false);
    setShowSearchTerm(true);
    const form = document.getElementById("searchForm") as HTMLFormElement;
    form?.reset();
  };

  useEffect(() => {
    const storedTags = JSON.parse(localStorage.getItem("searchedTags") || "[]");
    setSearchStoredTags(storedTags);
  }, []);

  const handleClearSearch = () => {
    setShowSearchTerm(false);
    setSearchPostsInput("");
    const form = document.getElementById("searchForm") as HTMLFormElement;
    form?.reset();
  };

  useEffect(() => {
    if (inView && hasNextPageSearchPost) {
      fetchNextPageSearchPost();
    }
  }, [inView, hasNextPageSearchPost, fetchNextPageSearchPost]);

  if (searchPostIsError) {
    toast.error("خطا در جستجو");
  }
  const getResponsiveColumnSpan = (index: number) => {
    if (index < 3) {
      return "md:col-span-4";
    } else if (index >= 3 && index < 7) {
      return "md:col-span-3";
    } else {
      return "md:col-span-2";
    }
  };

  const getSmallScreenColumnSpan = (index: number) => {
    if (index === 0) {
      return "col-span-12";
    } else if (index === 1 || index === 2) {
      return "col-span-6";
    } else if (index >= 3 && index <= 5) {
      return "col-span-4";
    } else {
      return "col-span-3";
    }
  };

  const handleOnClick = (id: string) => {
    setSelectedPhotoId(id);
    setPostShowModal(true);
  };

  const allPosts =
    searchPostData?.pages.flatMap((page) => page.data.posts) || [];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTagsSearchResult();
    }
    setShowDropDown(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTagsSearchResult();
  };

  return (
    <div dir="rtl" className="px-[72px] max-sm:px-2">
      <div className="relative">
        <div className="justify-center pr-4">
          <form id="searchForm" onSubmit={handleFormSubmit}>
            <input
              autoComplete="off"
              id="username"
              name="username"
              type="text"
              placeholder="جستجو در تگ ها..."
              onChange={handleChange}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              className="bg-transparent text-gray-900 placeholder:text-gray-400 border-1 mt-9 block w-80 flex-1 rounded-full px-2 py-2 focus:ring-0 sm:text-sm sm:leading-6"
            />
          </form>
        </div>
        <div className="absolute right-[310px] top-2">
          <SearchToggleMenu
            imgSrc={search}
            isOpen={showDropDown}
            onClick={handleTagsSearchResult}
          >
            {showDropDown && (
              <div>
                {searchTagsDataIsFetching ? (
                  <div className="flex justify-center py-2">
                    <BeatLoader size={10} />
                  </div>
                ) : searchTagsData ? (
                  <ul className="py-2">
                    {searchTagsData?.data?.map((user: any) => (
                      <li key={user}>
                        <button onClick={() => handleSelectTag(user)}>
                          <SearchTagSuggestion
                            name={user}
                          ></SearchTagSuggestion>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : searchTagsDataIsError ? (
                  <p>No results found</p>
                ) : null}
                <div>
                  {searchStoredTags.length > 0 && (
                    <ul className="border-t border-grey-400 py-2">
                      {searchStoredTags?.slice(-5).map((tag, index) => (
                        <li
                          key={index}
                          onClick={() => handleSelectHistoryTerm(tag)}
                        >
                          <SearchHistory text={tag}></SearchHistory>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </SearchToggleMenu>
        </div>
      </div>

      <div className="mt-10 flex justify-start max-sm:justify-center">
        <NavLink to="/searchUsers">
          <div className="flex">
            <h2 className="block px-7 font-isf text-xl text-grey-400 max-sm:px-2">
              افراد
            </h2>
          </div>
        </NavLink>

        <span className="px-4">|</span>

        <NavLink to="/searchPosts">
          <div className="flex">
            <h2 className="block px-7 font-isf text-xl max-sm:px-2">پست ها</h2>
          </div>
        </NavLink>
      </div>

      {showSearchTerm && (
        <div className="my-6 grid grid-cols-1 items-center gap-2 px-10 md:grid-cols-5 md:gap-2">
          <SearchTermDisplay
            text={searchPostsInput}
            onClick={handleClearSearch}
          ></SearchTermDisplay>
        </div>
      )}

      {isFetchingSearchPost && (
        <div className="flex justify-center py-2">
          <BeatLoader size={10} />
        </div>
      )}

      {searchPostData && allPosts.length === 0 ? (
        <div className="flex justify-center py-4">
          <p className="text-gray-500">پستی پیدا نشد!</p>
        </div>
      ) : (
        <div className="my-8 grid rounded-3xl">
          <div className="grid grid-cols-12 gap-6">
            {allPosts.map((post: Posts, globalIndex: number) => (
              <img
                key={post.id}
                className={`aspect-square max-h-[304px] w-full cursor-pointer rounded-3xl object-cover ${
                  globalIndex >= 7
                    ? "md:col-span-2"
                    : `${getResponsiveColumnSpan(globalIndex)} ${getSmallScreenColumnSpan(globalIndex)}`
                }`}
                src={`${post?.media[0]?.url}`}
                onClick={() => handleOnClick(post.id)}
              />
            ))}
          </div>

          {showPostModal && (
            <ModalTemplatePost
              onClose={() => setPostShowModal(false)}
              showModal={showPostModal}
            >
              <ShowPostModal
                onClose={() => setPostShowModal(false)}
                id={selectedPhotoId}
              />
            </ModalTemplatePost>
          )}
          <div className="flex justify-center" ref={ref}>
            {isFetchingSearchPost && <BeatLoader />}
          </div>
        </div>
      )}
    </div>
  );
}
