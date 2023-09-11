// Utilities
import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";
dayjs.extend(isBetween);

import { defineStore } from "pinia";

type TComments = {
  viraID: string;
  title: string;
  date: string;
  id: string;
};

export const useCommentsStore = defineStore("comments", {
  actions: {
    removeComments(id: string) {
      this.comments = this.comments.filter((comment) => comment.id !== id);
    },
    updateComments(newTask: Partial<TComments>, id: string) {
      this.comments = this.comments.map((comment) => {
        if (comment.id === id) return { ...comment, ...newTask };
        return comment;
      });
    },
    addComments(newTask: Omit<TComments, "id">) {
      this.comments.push({
        ...newTask,
        id: dayjs().format("YYYY-MM-DD"),
        date: dayjs().toJSON(),
      });
    },
  },
  getters: {
    getComments(state) {
      return (viraID: string): TComments[] =>
        state.comments
          .filter((comment) => comment.viraID === viraID)
          .sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));
    },
  },
  state: () => ({ comments: [] }),
});
