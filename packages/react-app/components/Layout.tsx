import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import BottomNavBar from "./BottomNavBar";

interface Props {
    children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
    return (
        <>
            <div className="bg-white overflow-hidden flex flex-col min-h-screen">
                {/* <NavBar /> */}
                {/* <Header /> */}
                {/* search bar */}
                {/* <SearchBar /> */}
                {/* end of search bar */}
                <div className="py-16 max-w-7xl mx-auto space-y-8 sm:px-6 lg:px-8">
                    {children}
                </div>
                {/* <BottomNavBar /> */}
            </div>
        </>
    );
};

export default Layout;
