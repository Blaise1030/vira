// Utilities
import { defineStore } from "pinia";

type TTask = {
  id: string;
  title: string;
  description: string;
  media: string;
  category: string;
  boardId: string;
};

export const useAppStore = defineStore("app", {
  actions: {
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
      });
      console.log(this.board);
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
    getHighlightCards: (state) => {
      const cards = state.board.flatMap(({ child }) => child);
      const searchedCards = cards.filter((card) =>
        JSON.stringify(card)
          .toLowerCase()
          .includes((state?.boardSearchState || "").toLowerCase())
      );
      return searchedCards.map((card) => card.id);
    },
    getProgress: (state) => {
      const done = state.board.filter(({ id }) => id === "DONE")[0].child
        .length;
      const total = state.board.reduce((acc, cur) => acc + cur.child.length, 0);
      return Math.floor((done / total) * 100);
    },
    getTasks: (state) => {
      return (boardID: string) =>
        state.board.filter(({ id }) => id === boardID)[0].child;
    },
  },
  state: () => ({
    ticketRunningNumber: 1,
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
