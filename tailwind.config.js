module.exports = {
  content: ["./dashboard/views/**/*.{html,js,ejs}"],
  theme: {
    fontFamily: {
      sans: ['"Source Sans Pro"', "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#3980FF",
        bggray: "#272934",
        darkerbggray: "#1F2129",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
<<<<<<< HEAD
};
=======
};
>>>>>>> d067698e3ef4d73c47c98b98159ba765f43555d4
