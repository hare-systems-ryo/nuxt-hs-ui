type Config = any;
export default <Partial<Config>>{
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    screens: {
      400: "400px",
      600: "600px",
      sm: "640px",
      md: "768px",
      800: "800px",
      1000: "1000px",
      lg: "1024px",
      1200: "1200px",
      xl: "1280px",
      1400: "1400px",
      "2xl": "1536px",
      1600: "1600px",
      1800: "1800px",
    },
    extend: {
      colors: {
        fore1: "#0d2b13",
        main0: "#192a61",
        main1: "#1c03a2",
        main2: "#4443ff",
        main3: "#628cff",
        accent1: "#ff8000",
        accent2: "#ffac7c",
        info: "#2badd5",
        link: "#6200EE",
        download: "#11691f",
        success: "#2bb60c",
        warn: "#EAB000",
        error: "#d80329",
        dark: "#224466",
        back: "#EDF2F7",
      },
    },
  },
};
