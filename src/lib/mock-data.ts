export const mockFolders = [
  { id: "1", name: "Documents", type: "folder", parent: "root" },
  { id: "2", name: "Images", type: "folder", parent: "root" },
  { id: "3", name: "Videos", type: "folder", parent: "root" },
];

export const mockFiles = [
  {
    id: "4",
    name: "Resume.pdf",
    type: "file",
    url: "/files/resume.pdf",
    parent: "root",
    size: "1.2 MB",
  },
  {
    id: "5",
    name: "Budget.xlsx",
    type: "file",
    url: "/files/budget.xlsx",
    parent: "root",
    size: "0.8 MB",
  },
];