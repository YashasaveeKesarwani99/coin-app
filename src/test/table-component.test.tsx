import { render, screen, waitFor } from "@testing-library/react";
import TableComponent from "../components/table-component";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { describe, it, vi } from "vitest";

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

const queryClient = new QueryClient();

const mockData = {
  data: [
    {
      id: "bitcoin",
      rank: "1",
      symbol: "BTC",
      name: "Bitcoin",
      supply: "19767143.0000000000000000",
      maxSupply: "21000000.0000000000000000",
      marketCapUsd: "1235992329092.1734079509968582",
      volumeUsd24Hr: "7932096311.8208089570182864",
      priceUsd: "62527.6161098330400074",
      changePercent24Hr: "-0.9402663170262052",
      vwap24Hr: "62814.1111660009012985",
      explorer: "https://blockchain.info/",
    },
    {
      id: "ethereum",
      rank: "2",
      symbol: "ETH",
      name: "Ethereum",
      supply: "120383420.5302165300000000",
      maxSupply: null,
      marketCapUsd: "294748784502.4035441993839254",
      volumeUsd24Hr: "3800037672.5913891790678968",
      priceUsd: "2448.4167604161146568",
      changePercent24Hr: "-1.1296032950325644",
      vwap24Hr: "2465.3814480564334296",
      explorer: "https://etherscan.io/",
    },
  ],
  timestamp: 3847598,
};

describe("Table Component", () => {
  const setPageNumberMock = vi.fn();

  const renderComponent = (isLoading = false) => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <TableComponent
              pageNumber={0}
              setPageNumber={setPageNumberMock}
              data={isLoading ? undefined : mockData}
              isLoading={isLoading}
            />
          </QueryClientProvider>
        </BrowserRouter>
      </RecoilRoot>
    );
  };

  it("renders loading state", () => {
    renderComponent(true);
    const divElement = screen.getByTestId("skeleton");
    expect(divElement).toBeInTheDocument();
  });

  it("renders table data correctly", async () => {
    renderComponent(false);

    await waitFor(() =>
      expect(screen.getByText(/Bitcoin/i)).toBeInTheDocument()
    );
  });
});
