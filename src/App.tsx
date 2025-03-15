
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import AllEntries from "./pages/AllEntries";
import EntryDetail from "./pages/EntryDetail";
import MarkdownEditor from "./components/editor/MarkdownEditor";
import CategoryView from "./pages/CategoryView";
import TagView from "./pages/TagView";
import CategoriesManage from "./pages/CategoriesManage";
import TagsManage from "./pages/TagsManage";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import AboutMe from "./pages/AboutMe";
import Impressum from "./pages/Impressum";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/all-entries" element={<AllEntries />} />
            <Route path="/entry/:entryId" element={<EntryDetail />} />
            <Route path="/editor/:entryId" element={<MarkdownEditor />} />
            <Route path="/category/:categoryId" element={<CategoryView />} />
            <Route path="/tag/:tagName" element={<TagView />} />
            <Route path="/categories" element={<CategoriesManage />} />
            <Route path="/tags" element={<TagsManage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about-me" element={<AboutMe />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
