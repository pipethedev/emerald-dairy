import {
  CreateNoteLink,
  Header,
  NavButton,
  Notes,
  SearchBar,
} from "@/app/components/global";

export default function FavouritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row h-[100vh]">
      <div className="md:w-[360px] h-fit md:h-full flex flex-col border-r-[1px] border-r-[#F2F2F2] overflow-auto">
        <Header>
          <NavButton />
          <SearchBar />
          <CreateNoteLink />
        </Header>
        <Notes type="favourite" path="/dashboard/favourites/" />
      </div>
      <main className="flex-1 w-full h-[100vh] overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
