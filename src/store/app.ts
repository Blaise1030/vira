// Utilities
import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";
dayjs.extend(isBetween);

import { defineStore } from "pinia";

type TTask = {
  id: string;
  title: string;
  description: string;
  media: string;
  category: string;
  boardId: string;
  targetDate: string;
};

export const useAppStore = defineStore("app", {
  actions: {
    setDateRange(a: any) {
      this.boardSearchDateState = a;
    },
    removeBoard(id: string) {
      this.board = this.board.filter((board) => board.id !== id);
    },
    addTasks(newTask: Omit<TTask, "id">) {
      this.board = this.board.map((board) => {
        if (board.id !== newTask.boardId) return board;
        const newNumber = this.ticketRunningNumber;
        this.ticketRunningNumber += 1;
        return {
          ...board,
          child: [
            ...board.child,
            {
              ...newTask,
              media: "https://picsum.photos/200/300",
              id: `VIRA-${newNumber}`,
            },
          ],
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
    getBoardTitle: (state) => Object.keys(state.board),
    getHideCards: (state) => {
      return state.board
        .flatMap(({ child }) => child)
        .filter(({ targetDate }) => {
          const search = state.boardSearchDateState;
          if (search.length === 0) return false;
          return !dayjs(targetDate).isBetween(
            dayjs(search[0]),
            dayjs(search[1])
          );
        })
        .map((a) => (a as any)?.id);
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
    ticketRunningNumber: 1,
    boardSearchDateState: [],
    boardSearchState: "",
    taskCategories: [
      { id: "231231", title: "Bug", color: "red" },
      { id: "23123", title: "Task", color: "green" },
      { id: "123123", title: "Story", color: "primary" },
      { id: "223", title: "Epic", color: "secondary" },
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
