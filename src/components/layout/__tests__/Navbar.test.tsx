import { render, screen } from "@testing-library/react";
import Navbar from "../Navbar";
import { useWhimsy } from "@/context/WhimsyContext";

// Mock next/navigation
jest.mock("next/navigation", () => ({
    usePathname: () => "/",
}));

// Mock WhimsyContext
jest.mock("@/context/WhimsyContext", () => ({
    useWhimsy: jest.fn(),
}));

describe("Navbar", () => {
    beforeEach(() => {
        // Default mock implementation
        (useWhimsy as jest.Mock).mockReturnValue({
            whimsyMode: false,
            isLoaded: true,
        });
    });

    it("renders the logo and club name", () => {
        render(<Navbar />);

        expect(screen.getByAltText("Logo")).toBeInTheDocument();
    });

    it("renders navigation links", () => {
        render(<Navbar />);

        const links = ["Home", "Blogs", "Gallery", "Team", "Events", "About"];

        links.forEach((linkText) => {
            // We use getAllByText because mobile menu duplicates links
            const linkElements = screen.getAllByText(linkText);
            expect(linkElements.length).toBeGreaterThan(0);
            expect(linkElements[0]).toBeInTheDocument();
        });
    });
});
