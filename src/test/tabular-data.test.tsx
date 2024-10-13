import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import TabularData from "../page/tabular-data";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

// Setting up QueryClient instance for React Query
const queryClient = new QueryClient();

describe("Tabular Component", () => {
  it("renders table data correctly", async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <TabularData />
          </QueryClientProvider>
        </BrowserRouter>
      </RecoilRoot>
    );

    await waitFor(() =>
      expect(screen.getByText(/Bitcoin/i)).toBeInTheDocument()
    );
  });
});
