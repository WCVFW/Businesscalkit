import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Assuming cn is a utility function for Tailwind CSS class merging
import { cn } from "@/lib/utils";
import {
  // Assuming these custom components are imported from the local project file structure
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Menu,
  X,
  FileText,
  Clipboard,
  Briefcase,
  Shield,
  BarChart,
  Globe,
  Award,
  Heart,
  BookOpen,
  DollarSign,
  User,
} from "lucide-react";


/* --------------------------------------------------------------------------
   I. Main Header Component
   - Now correctly integrates the complex dropdown menu via HeaderNav.
---------------------------------------------------------------------------*/
export default function Header({ user, logout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* ====== Main Header Wrapper (for sticky positioning and gradient background) ====== */}
      <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-green-100 via-purple-100 to-pink-100 py-6 px-4 md:px-8">
        {/* The inner container provides the pill shape and backdrop effect */}
        <div className="flex items-center justify-between mx-auto max-w-6xl px-8 py-4 bg-white/40 backdrop-blur-sm rounded-full">
          
          {/* Logo - FIX: Reinstated Logo SVG and text */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-gray-900 hover:text-purple-600 transition-colors min-w-fit"
            onClick={() => setMenuOpen(false)}
          >
            {/* SaasoX Logo SVG */}
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="4" fill="#9333ea" opacity="0.8" />
              <circle cx="16" cy="8" r="4" fill="#a855f7" />
              <circle cx="8" cy="16" r="4" fill="#a855f7" />
              <circle cx="16" cy="16" r="4" fill="#9333ea" opacity="0.6" />
            </svg>
            <span>**SaasoX**</span>
          </Link>

          {/* Desktop Navigation - INTEGRATED HeaderNav */}
          <div className="items-center hidden lg:flex">
            <HeaderNav currentPath={location.pathname} />
          </div>

          {/* Right Section (Desktop) */}
          <div className="items-center hidden space-x-4 lg:flex">
            {user ? (
              <div className="relative">
                <AccountMenu user={user} logout={logout} />
              </div>
            ) : (
              <Link to="/signup" className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors font-semibold text-sm flex items-center gap-2">
                GET STARTED <span>→</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-gray-700 lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-gradient-to-b from-green-100 via-purple-100 to-pink-100 p-6 transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto",
          menuOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
        aria-hidden={!menuOpen}
      >
        {/* Mobile Navigation - INTEGRATED HeaderNav */}
        <div className="flex flex-col space-y-4 pt-8 pb-4">
            <HeaderNav currentPath={location.pathname} setMenuOpen={setMenuOpen} isMobile={true} />
        </div>


        <div className="pt-6 mt-6 border-t border-gray-300">
          {user ? (
            <>
              <Link to={user?.role === 'ADMIN' ? '/dashboard/admin' : user?.role === 'EMPLOYEE' ? '/dashboard/employee' : '/dashboard/user'} onClick={() => setMenuOpen(false)} className="block w-full text-center bg-white text-purple-600 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Dashboard
              </Link>
              <Link to={user?.role === 'ADMIN' ? '/dashboard/admin/profile' : user?.role === 'EMPLOYEE' ? '/dashboard/employee/profile' : '/dashboard/user/profile'} onClick={() => setMenuOpen(false)} className="mt-3 block w-full text-center bg-white text-purple-600 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                My Account
              </Link>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                }}
                className="mt-3 w-full bg-purple-600 text-white py-2.5 rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block w-full text-center bg-purple-600 text-white py-2.5 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                Login
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="block w-full text-center mt-3 bg-gray-100 text-purple-600 py-2.5 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

/* --------------------------------------------------------------------------
   Account Menu (user dropdown) - No Change
---------------------------------------------------------------------------*/
function AccountMenu({ user, logout }) {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  const goToDashboard = () => {
    const path = user?.role === 'ADMIN' ? '/dashboard/admin' : user?.role === 'EMPLOYEE' ? '/dashboard/employee' : '/dashboard/user';
    setOpen(false);
    nav(path);
  };

  const handleLogout = () => {
    setOpen(false);
    if (logout) logout();
    // Page refresh happens in logout function from App.jsx
  };

  return (
    <div className="relative inline-block text-left">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
        <User className="w-5 h-5 text-purple-600" />
        <span className="hidden md:inline text-gray-700 font-medium">{user?.fullName || user?.name || user?.email}</span>
      </button>
      {open && (
        <div className="absolute right-0 z-50 py-2 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-44">
          <button onClick={goToDashboard} className="w-full px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors">Dashboard</button>
          <Link to={user?.role === 'ADMIN' ? '/dashboard/admin/profile' : user?.role === 'EMPLOYEE' ? '/dashboard/employee/profile' : '/dashboard/user/profile'} onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors">My Account</Link>
          <button onClick={handleLogout} className="w-full px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors">Logout</button>
        </div>
      )}
    </div>
  );
}

/* --------------------------------------------------------------------------
   II. Navigation Section
   - Includes simple links (Home, About Us, Contact Us) and complex dropdowns.
---------------------------------------------------------------------------*/
function HeaderNav({ currentPath, setMenuOpen, isMobile = false }) {
  const handleLinkClick = () => setMenuOpen && setMenuOpen(false);

  // Define icons object
  const icons = {
    FileText: <FileText className="w-4 h-4 mr-2" />,
    Clipboard: <Clipboard className="w-4 h-4 mr-2" />,
    Briefcase: <Briefcase className="w-4 h-4 mr-2" />,
    Shield: <Shield className="w-4 h-4 mr-2" />,
    BarChart: <BarChart className="w-4 h-4 mr-2" />,
    Globe: <Globe className="w-4 h-4 mr-2" />,
    Award: <Award className="w-4 h-4 mr-2" />,
    Heart: <Heart className="w-4 h-4 mr-2" />,
    BookOpen: <BookOpen className="w-4 h-4 mr-2" />,
    DollarSign: <DollarSign className="w-4 h-4 mr-2" />,
  };

  return (
    // Conditional styling for vertical orientation on mobile
    <NavigationMenu orientation={isMobile ? "vertical" : "horizontal"} className="w-full lg:w-auto">
      <NavigationMenuList className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-4">
        
        {/* ===================== Home (Simple Link) ===================== */}
        <NavigationMenuItem className="w-full lg:w-auto">
          <NavigationMenuLink asChild>
            <Link to="/" onClick={handleLinkClick} className={cn("px-4 py-2.5 text-sm font-medium transition-colors rounded-md hover:bg-gray-100 hover:text-purple-600", currentPath === "/" && "font-semibold text-purple-600 bg-gray-50")}>
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* ===================== About Us (Simple Link) ===================== */}
        <NavigationMenuItem className="w-full lg:w-auto">
          <NavigationMenuLink asChild>
            <Link to="/about" onClick={handleLinkClick} className={cn("px-4 py-2.5 text-sm font-medium transition-colors rounded-md hover:bg-gray-100 hover:text-purple-600", currentPath === "/about" && "font-semibold text-purple-600 bg-gray-50")}>
              About Us
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        {/* ===================== Services (Mapped from Consult an Expert) ===================== */}
        <NavItem
          title="Services" // Matches the design image navigation
          menuWidth="lg:w-[280px]"
          links={[
            ["Talk to a Lawyer", "/ConsultanExpert/talkToLawyer", "FileText"],
            ["Talk to a Chartered Accountant", "/ConsultanExpert/talkToCA", "Clipboard"],
            ["Talk to a Company Secretary", "/ConsultanExpert/talkToCS", "Briefcase"],
            ["Talk to an IP/Trademark Lawyer", "/ConsultanExpert/talkToIP", "Shield"],
          ]}
          currentPath={currentPath}
          icons={icons}
          handleLinkClick={handleLinkClick}
          isMobile={isMobile}
        />

        {/* ===================== Pages (Mapped from Business Setup) ===================== */}
        <NavItem
          title="Pages" // Matches the design image navigation
          menuWidth="lg:w-[900px]"
          gridCols="lg:grid-cols-3"
          linksGroups={[
            {
              title: "Company Registration",
              links: [
                ["Private Limited Company", "/BusinessSetup/plc", "Briefcase"], ["Limited Liability Partnership", "/BusinessSetup/llp", "Briefcase"],
                ["One Person Company", "/BusinessSetup/opc", "Briefcase"], ["Sole Proprietorship", "/BusinessSetup/sp", "Briefcase"],
                ["Nidhi Company", "/BusinessSetup/nidhi", "Briefcase"], ["Producer Company", "/BusinessSetup/producer", "Briefcase"],
                ["Partnership Firm", "/BusinessSetup/partnership", "Briefcase"], ["Startup India Registration", "/BusinessSetup/startup", "BarChart"],
              ],
            },
            {
              title: "International Business Setup",
              links: [
                ["US Incorporation", "/International/us", "Globe"], ["Singapore Incorporation", "/International/singapore", "Globe"],
                ["UK Incorporation", "/International/uk", "Globe"], ["Netherlands Incorporation", "/International/netherlands", "Globe"],
                ["Hong Kong Company", "/International/hong-kong", "Globe"], ["Dubai Company", "/International/dubai", "Globe"],
                ["International TM Registration", "/International/international-trademark", "Shield"],
              ],
            },
            {
              title: "Licenses & Registrations",
              links: [
                ["Digital Signature Certificate", "/Licenses/dsc", "Award"],
                ["Udyam Registration", "/Licenses/udyam", "Award"],
                ["MSME Registration", "/Licenses/msme", "Award"],
                ["ISO Certification", "/Licenses/iso", "Award"],
                ["FSSAI [Food License]", "/Licenses/fssai", "Heart"],
                ["IEC [Import/Export Code]", "/Licenses/iec", "Globe"],
                ["Apeda RCMC", "/Licenses/apeda-rcmc", "BookOpen"],
                ["Spice Board Registration", "/Licenses/spice-board", "BookOpen"],
                ["FIEO Registration", "/Licenses/fieo", "BookOpen"],
                ["Legal Metrology", "/Licenses/legal-metrology", "Clipboard"],
                ["Hallmark Registration", "/Licenses/hallmark", "Shield"],
                ["BIS Registration", "/Licenses/bis", "Shield"],
                ["Liquor License", "/Licenses/liquor", "Award"],
                ["CLRA Registration & Licensing", "/Licenses/clra", "Award"],
                ["AD Code Registration", "/Licenses/adcode", "Award"],
                ["IRDAI Registration", "/Licenses/irdai", "Award"],
                ["Drug & Cosmetic License", "/Licenses/drug-cosmetic", "Award"],
                ["Customs Clearance", "/Licenses/customs-clearance", "Award"],
              ],
            }
          ]}
          currentPath={currentPath}
          icons={icons}
          handleLinkClick={handleLinkClick}
          fixedWidth={900}
          isMobile={isMobile}
        />

        {/* ===================== Blog (Mapped from Fundraising + NGO) ===================== */}
        <NavItem
          title="Blog" // Matches the design image navigation
          menuWidth="lg:w-[700px]"
          gridCols="lg:grid-cols-2"
          linksGroups={[
            {
              title: "Fundraising & Loans",
              links: [
                ["Fundraising", "/Fundraising", "DollarSign"], ["Pitch Deck", "/Fundraising/pitch-deck", "BarChart"],
                ["Business Loan", "/Fundraising/business-loan", "DollarSign"], ["DPR Service", "/Fundraising/dpr", "FileText"],
              ]
            },
            {
              title: "NGO & Compliance",
              links: [
                ["NGO Registration", "/NGO", "Heart"], ["Section 8 Company", "/NGO/section-8", "Heart"],
                ["Trust Registration", "/NGO/trust", "Clipboard"], ["Society Registration", "/NGO/society", "Clipboard"],
                ["FCRA Registration", "/NGO/fcra", "Award"],
                ["Sec.80G & Sec.12A", "/NGO/80g-12a", "FileText"],
              ]
            },
          ]}
          currentPath={currentPath}
          icons={icons}
          handleLinkClick={handleLinkClick}
          fixedWidth={700} // Pass the expected desktop width
          isMobile={isMobile}
        />
        
        {/* ===================== Contact Us (Simple Link) ===================== */}
        <NavigationMenuItem className="w-full lg:w-auto">
          <NavigationMenuLink asChild>
            <Link to="/contact" onClick={handleLinkClick} className={cn("px-4 py-2.5 text-sm font-medium transition-colors rounded-md hover:bg-gray-100 hover:text-purple-600", currentPath === "/contact" && "font-semibold text-purple-600 bg-gray-50")}>
              Contact Us
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  );
}

/* --------------------------------------------------------------------------
   III. Dropdown Item Components (with Responsive Positioning) - No Change
---------------------------------------------------------------------------*/
function NavItem({
  title,
  icon,
  links,
  linksGroups,
  menuWidth = "lg:w-[300px]",
  gridCols = "lg:grid-cols-1",
  currentPath,
  icons,
  handleLinkClick,
  fixedWidth = 300, // Default expected desktop width in pixels
  isMobile = false,
}) {
  const itemRef = useRef(null);
  const [positionClass, setPositionClass] = useState("lg:left-0 lg:translate-x-0");

  useEffect(() => {
    const handleResize = () => {
      // Logic is only for large screens (desktop positioning)
      if (window.innerWidth < 1024) {
        setPositionClass(""); 
        return;
      }

      if (itemRef.current) {
        const rect = itemRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const DROPDOWN_WIDTH = fixedWidth;
        const PADDING = 20;

        // Special handling for the centered "Pages" menu (Original "Business Setup")
        const isCentered = title === "Pages"; 
        if (isCentered && fixedWidth === 900) {
          setPositionClass("lg:left-1/2 lg:-translate-x-1/2");
          return;
        }

        // Check if the dropdown overflows the right edge
        if (rect.left + DROPDOWN_WIDTH + PADDING > viewportWidth) {
          setPositionClass("lg:right-0 lg:left-auto");
        } else {
          setPositionClass("lg:left-0 lg:right-auto");
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fixedWidth, title]);

  const finalPositionClass = positionClass; 

  return (
    <NavigationMenuItem ref={itemRef} className="w-full lg:w-auto lg:relative">
      <NavigationMenuTrigger
        className={cn(
            "flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium transition-colors rounded-md hover:bg-gray-100 hover:text-purple-600",
            // Check if any link in the dropdown is active to apply active state to the trigger
            (links?.some(([_, href]) => currentPath === href) || linksGroups?.some(group => group.links.some(([_, href]) => currentPath === href))) && "font-semibold text-purple-600 bg-gray-50"
        )}
      >
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
          {/* Add a plus icon/text for visual cue in the navigation bar */}
          <span className="ml-1 text-xs font-normal">+</span>
        </div>
      </NavigationMenuTrigger>

      <NavigationMenuContent className={cn(
        "p-6 bg-white border border-gray-100 shadow-xl rounded-lg", 
        "lg:absolute lg:top-full lg:mt-3 lg:block", 
        "w-full h-auto mt-2", 
        menuWidth,
        gridCols,
        finalPositionClass // Dynamic (or fixed-center) positioning
      )}>
        {/* Single Links */}
        {links && (
          <MenuGroup title={title} links={links} currentPath={currentPath} icons={icons} handleLinkClick={handleLinkClick} />
        )}

        {/* Grouped Menus */}
        {linksGroups && (
          <div className={cn("grid w-full gap-6", gridCols)}>
            {linksGroups.map((group) => (
              <MenuGroup
                key={group.title}
                title={group.title}
                links={group.links}
                currentPath={currentPath}
                icons={icons}
                handleLinkClick={handleLinkClick}
              />
            ))}
          </div>
        )}
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

/* --------------------------------------------------------------------------
   IV. Menu Group (Sub-List) Component - No Change
---------------------------------------------------------------------------*/
function MenuGroup({
  title,
  links,
  currentPath,
  icons,
  handleLinkClick,
}) {
  return (
    <div>
      <p className="mb-3 font-sans text-sm font-bold text-gray-900">{title}</p>
      <ul
        className="space-y-1.5 overflow-y-auto"
        // Limits height and enables vertical scrolling (as requested)
        style={{ maxHeight: "60vh" }}
      >
        {links.map(([label, href, iconName]) => (
          <li key={label}>
            <NavigationMenuLink asChild>
              <Link
                to={href}
                onClick={handleLinkClick} // Closes mobile menu
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-gray-600 text-sm transition-colors hover:bg-purple-50 hover:text-purple-700",
                  currentPath === href && "bg-purple-50 font-medium text-purple-700"
                )}
              >
                {/* Look up icon JSX using the string name */}
                {iconName && icons[iconName] && <span className="mr-2 text-purple-600">{icons[iconName]}</span>}
                {label}
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
    </div>
  );
}