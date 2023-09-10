// Utilities
import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";
dayjs.extend(isBetween);

import { defineStore } from "pinia";

type TTask = {
  id: string;
  title: string;
  description: string;
  category: string[];
  boardId: string;
  targetDate: string;
  media: {
    fileUrl: string;
    fileName: string;
    fileType: string;
    fileId: string;
  }[];
};

export const useAppStore = defineStore("app", {
  actions: {
    setDateRange(a: any) {
      this.boardSearchDateState = a;
    },
    removeBoard(id: string) {
      this.board = this.board.filter((board) => board.id !== id);
    },
    updateTasks(newTask: TTask) {
      this.board = this.board.map((board) => {
        if (board.id !== newTask.boardId) return board;
        return {
          ...board,
          child: board.child.map((c) => (c.id === newTask.id ? newTask : c)),
        };
      }) as any;
    },
    addTasks(newTask: Omit<TTask, "id">) {
      this.board = this.board.map((board) => {
        if (board.id !== newTask.boardId) return board;
        const newNumber = this.ticketRunningNumber;
        this.ticketRunningNumber += 1;
        return {
          ...board,
          child: [...board.child, { ...newTask, id: `VIRA-${newNumber}` }],
        };
      }) as any;
    },
    addBoard(title: string) {
      if (title === "") return;
      this.board = [
        ...this.board,
        {
          id: new Date().getTime().toString(),
          title: title,
          child: [],
        },
      ];
    },
  },
  getters: {
    getTask: (state) => (taskID: string) =>
      state?.board
        .flatMap(({ child }) => child)
        .filter(({ id }) => id === taskID)[0],
    getBoardTitle: (state) => Object.keys(state.board),
    getHideCards: (state) => {
      const child = state.board.flatMap(({ child }) => child);
      const hideDate = child.filter(({ targetDate }) => {
        const search = state.boardSearchDateState;
        if (search.length === 0) return false;
        return !dayjs(targetDate).isBetween(dayjs(search[0]), dayjs(search[1]));
      });
      const hideCategory = child.filter(({ category }) => {
        const search = state.boardSearchCategoryState;
        if (search.length === 0) return false;
        return !search.every((cat: string) => category.includes(cat));
      });
      return [...hideDate, ...hideCategory].map((a) => (a as any)?.id);
    },
    getHighlightCards: (state) => {
      const cards = state.board.flatMap(({ child }) => child);
      const searchedCards = cards.filter((card) =>
        JSON.stringify(card)
          .toLowerCase()
          .includes((state?.boardSearchState || "").toLowerCase())
      );
      return searchedCards.map((card) => (card as any)?.id);
    },
    getProgress: (state) => {
      const done = state.board.filter(({ id }) => id === "DONE")[0].child
        .length;
      const total = state.board.reduce((acc, cur) => acc + cur.child.length, 0);
      return Math.floor((done / total) * 100);
    },
    getTasks: (state) => {
      return (boardID: string) =>
        state.board?.filter(({ id }) => id === boardID)[0]?.child;
    },
  },
  state: () => ({
    boardSearchCategoryState: [],
    boardSearchDateState: [],
    ticketRunningNumber: 1,
    boardSearchState: "",
    taskCategories: [
      { id: "231231", title: "Highest Priority", color: "red" },
      { id: "23123", title: "Medium Priority", color: "green" },
      { id: "123123", title: "Lowest Priority", color: "primary" },
      { id: "121", title: "Hard", color: "red" },
      { id: "233", title: "Moderate", color: "green" },
      { id: "122", title: "Easy", color: "primary" },
    ],
    board: [
      {
        id: "PENDING",
        title: "Pending",
        child: [],
      },
      {
        id: "PROCESSING",
        title: "Processing",
        child: [],
      },
      {
        id: "DONE",
        title: "Done",
        child: [],
      },
    ],
  }),
});
