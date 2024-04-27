"use client";
import React, { Fragment, useEffect, useState } from "react";
import { AddIcon, SearchIcon } from "../../svgs";
import { useAppSelector } from "@/hooks/store";
import { Combobox, Menu, Transition } from "@headlessui/react";
import AnimateInOut from "../AnimateInOut";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTerm, setSelectedTerm] = useState<Note>();
  // const [query, setQuery] = useState("");

  const documents = useAppSelector((state) => state.notes);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredDocuments = documents?.filter((document) =>
    document.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectedTerm = (term: Note) => {
    setSelectedTerm(term);
    //  term = note
    router.replace(`/dashboard/all-notes/${term?.id}`);
  };

  return (
    <div className="h-[40px] overflow-clip rounded-[10px] flex-1 w-full bg-[#FAFAFA]">
      <Combobox value={selectedTerm} onChange={handleSelectedTerm}>
        {({ open = false }) => (
          <>
            <div className="relative p-2 h-full flex items-center gap-2 w-full z-[102]">
              <SearchIcon />
              <Combobox.Input
                className="outline-none w-full h-full placeholder-[#B3B3B3] z-[102] bg-transparent text-[14px]"
                placeholder="Search..."
                onChange={handleSearchChange}
                // displayValue={(person) => {
                //   console.log({ person });
                //   return "";
                // }}
              />
            </div>
            {/*
            Use the `Transition` + `open` render prop argument to add transitions.
          */}
            {/* <Transition
              show={open && searchTerm !== ""}
              enter="transition duration-100 ease-out"
              enterFrom="transform translate-y-[-100px] opacity-0"
              enterTo="transform translate-y-0 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform translate-y-0 opacity-100"
              leaveTo="transform translate-y-[-100px] opacity-0"
            > */}
            {/*
              Don't forget to add `static` to your `Combobox.Options`!
            */}
            <AnimateInOut
              show={open && searchTerm !== ""}
              initial={{ opacity: 0, translateY: -100 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -100 }}
              transition={{ type: "keyframes", duration: 0.3 }}
              className="!z-[101] space-y-2 p-1 top-full rounded-b-xl bg-white left-0 w-full absolute shadow-md"
            >
              <Combobox.Options hold className="space-y-2 p-1" static>
                {filteredDocuments.length ? (
                  filteredDocuments.map((document) => (
                    <Combobox.Option
                      as={Fragment}
                      key={document.id}
                      value={document}
                    >
                      {({ active, selected }) => (
                        <li
                          className={clsx(
                            "bg-gray-100/70 rounded mx-auto w-[98%]_ p-2 ",
                            active && "bg-primary-3/30",
                            selected && "bg-primary"
                          )}
                        >
                          {document.title}
                        </li>
                      )}
                    </Combobox.Option>
                  ))
                ) : (
                  <p className="text-gray-800">
                    No results match your search term
                  </p>
                )}
              </Combobox.Options>
            </AnimateInOut>
            {/* </Transition> */}
          </>
        )}
      </Combobox>
      {/* {searchTerm && (
        <ul className="z-[100000000000] space-y-2 p-1 top-full rounded-b-xl bg-white left-0 w-full absolute shadow-md">
          {filteredDocuments?.map((document, index) => (
            <li
              className="bg-gray-100/70 rounded mx-auto w-[98%]_ p-2 "
              key={index}
            >
              {document.title}
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
}

interface Document {
  content: {
    type: string;
    value: string;
  }[];
  tag: {
    id: string;
    name: string;
    owner: string;
    timestamp: string; // or Date if you want to parse it
    title: string;
    type: string;
  };
}
