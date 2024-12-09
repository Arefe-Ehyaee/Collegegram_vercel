import { NavLink, useNavigate } from "react-router-dom";
import search from "../../../assets/icons/Frame.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import SearchAvatarName from "./SearchAvatarName";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import SearchToggleMenu from "../SearchToggleMenu";
import SearchHistory from "../SearchHistory";
import { BeatLoader } from "react-spinners";
import SearchUsersCard from "./SearchUsersCard";
import SearchTermDisplay from "../SearchTermDisplay";
import { toast } from "react-toastify";
import defaultAvatar from "../../../assets/icons/defaultavatar.svg";
import { FetchUsersSerach } from "./FetchUsersSerach";
import { FetchUsersSerachSuggestion } from "./FetchUsersSerachSuggestion";
import { User } from "../Interfaces";
import { useInView } from "react-intersection-observer";

export default function SearchPagePeopleComponent() {
  const [searchPeopleInput, setSearchPeopleInput] = useState<string>("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [searchStoredUsernames, setSearchStoredUsernames] = useState<string[]>(
    [],
  );
  const { ref, inView } = useInView();
  // const [selectedSearchTerm, setSelectedSearchTerm] =useState<string>("");
  const [isToggleMenuClicked, setIsToggleMenuClicked] = useState(false);
  const [showSearchTerm, setShowSearchTerm] = useState(false);
  const navigate = useNavigate();
  const token: string = localStorage.getItem("token") ?? "";

  const {
    data: searchPeopleCardData,
    fetchNextPage: fetchNextPageSearchPeopleCard,
    hasNextPage: hasNextPageSearchPeopleCard,
    isFetching: isFetchingSearchPeopleCard,
    isError: searchPeopleCardIsError,
    error: searchPeopleCardError,
    refetch: searchPeopleCardIsFetching,
  } = useInfiniteQuery({
    queryKey: ["searchPeopleCard", searchPeopleInput],
    queryFn: async ({ pageParam = 1 }) =>
      FetchUsersSerach({ pageParam }, token, searchPeopleInput),
    getNextPageParam: (lastPage) => {
      return lastPage?.data?.nextPage ?? undefined;
    },
    initialPageParam: 1,
    enabled: !!token && !!showSearchTerm,
  });

  const fetchUserSuggestions = async () => {
    if (!searchPeopleInput || searchPeopleInput.length < 3) {
      return [];
    }
    return FetchUsersSerachSuggestion(token, searchPeopleInput) ?? [];
  };

  const {
    //suggestion
    data: searchPeopleData,
    isError: searchPeopleDataIsError,
    isFetching: searchPeopleDataIsFetching,
    refetch: searchPeopleRefetch,
  } = useQuery({
    queryKey: ["searchPeople", searchPeopleInput],
    queryFn: fetchUserSuggestions,
    enabled: searchPeopleInput.length >= 3,
    staleTime: 5000,
  });

  const handleSearchDebounce = useCallback(
    debounce((value: string) => {
      setSearchPeopleInput(value);
      if (value) {
        searchPeopleRefetch();
      }
    }, 500),
    [searchPeopleRefetch], //dependecy
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      setShowDropDown(value.length >= 3);
    }
    if (value.length >= 3) {
      handleSearchDebounce(value);
    }
  };

  const handleFocus = () => {
    if (searchPeopleInput.length >= 3) {
      setShowDropDown(true);
    }
  };

  const handleSelectHistoryTerm = (username: string) => {
    setSearchPeopleInput(username);
    setIsToggleMenuClicked((prevState) => !prevState);
    setShowDropDown(false);
    setShowSearchTerm(true);
    const form = document.getElementById("searchForm") as HTMLFormElement;
    form?.reset();
  };

  useEffect(() => {
    if (searchPeopleData && searchPeopleData.length > 0) {
      setShowDropDown(true);
    }
  }, [searchPeopleData]);

  const handleSelectPerson = (username: string) => {
    const storedUsernames = JSON.parse(
      localStorage.getItem("searchedUsernames") || "[]",
    );

    if (!storedUsernames.includes(username)) {
      const updatedStoredUsernames = [...storedUsernames, username];
      localStorage.setItem(
        "searchedUsernames",
        JSON.stringify(updatedStoredUsernames),
      );
    }
    navigate(`/users/profile?username=${username}`);
  };

  useEffect(() => {
    const storedUsernames = JSON.parse(
      localStorage.getItem("searchedUsernames") || "[]",
    );
    setSearchStoredUsernames(storedUsernames);
  }, []);

  const handleUsersSearchResult = () => {
    setIsToggleMenuClicked((prevState) => !prevState);
    setShowDropDown(false);
    setShowSearchTerm(true);
  };

  const handleClearSearch = () => {
    setShowSearchTerm(false);
    setSearchPeopleInput("");
    const form = document.getElementById("searchForm") as HTMLFormElement;
    form?.reset();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleUsersSearchResult();
    }
    setShowDropDown(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUsersSearchResult();
  };

  const allUsers =
    searchPeopleCardData?.pages.flatMap((page) => page.data.users) || [];

  return (
    <div dir="rtl" className="md:px-[72px] max-sm:pr-2">
      <div className="relative">
        <div className="justify-center pr-4">
          <form id="searchForm" onSubmit={handleFormSubmit}>
            <input
              autoComplete="off"
              id="username"
              name="username"
              type="text"
              placeholder="جستجو در افراد..."
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
            onClick={handleUsersSearchResult}
          >
            {showDropDown && (
              <div>
                {searchPeopleDataIsFetching ? (
                  <div className="flex justify-center py-2">
                    <BeatLoader size={10} />
                  </div>
                ) : searchPeopleData ? (
                  <ul>
                    {searchPeopleData?.data?.map((user: User) => (
                      <li key={user.username}>
                        <button
                          onClick={() => handleSelectPerson(user.username)}
                        >
                          <SearchAvatarName
                            name={user.username}
                            avatar={user.avatar?.url || defaultAvatar}
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : searchPeopleDataIsError ? (
                  <p>No results found</p>
                ) : null}
                <div>
                  {searchStoredUsernames.length > 0 && (
                    <ul className="border-t border-grey-400 py-2">
                      {searchStoredUsernames
                        ?.slice(-5)
                        .map((username, index) => (
                          <li
                            key={index}
                            onClick={() => handleSelectHistoryTerm(username)}
                          >
                            <SearchHistory text={username}></SearchHistory>
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

      <div className="my-10 flex max-sm:items-center max-sm:justify-center">
        <NavLink to="/searchUsers">
          <div className="flex">
            <h2 className="block px-7 font-isf text-xl max-sm:px-2">افراد</h2>
          </div>
        </NavLink>

        <span className="px-4">|</span>

        <NavLink to="/searchPosts">
          <div className="flex">
            <h2 className="block px-7 font-isf text-xl text-grey-400 max-sm:px-2">
              پست ها
            </h2>
          </div>
        </NavLink>
      </div>

      {showSearchTerm && (
        <div className="my-6 grid grid-cols-1 items-center gap-2 px-10 md:grid-cols-5 md:gap-2">
          <SearchTermDisplay
            text={searchPeopleInput}
            onClick={handleClearSearch}
          ></SearchTermDisplay>
        </div>
      )}

      {searchPeopleDataIsFetching && (
        <div className="flex justify-center py-2">
          <BeatLoader size={10} />
        </div>
      )}

      {searchPeopleCardData && allUsers.length === 0 ? (
        <div className="flex justify-center py-4">
          <p className="text-gray-500">کاربری پیدا نشد!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 items-center gap-6 px-6 md:px-10 md:grid-cols-3 md:gap-2">
          {allUsers.map((user: User) => (
            <SearchUsersCard
              name={user.username}
              followersNumber={user.followersCount}
              avatar={user.avatar?.url || defaultAvatar}
              followedStatus={user.followedStatus}
              followingStatus={user.followingStatus}
              isCloseFriend={user.isCloseFriend}
              userId={user.id}
              onClick={() => handleSelectPerson(user.username)}
            ></SearchUsersCard>
          ))}
        </div>
      )}

      <div className="flex justify-center" ref={ref}>
        {isFetchingSearchPeopleCard && <BeatLoader />}
      </div>
    </div>
  );
}
