const notionParam = ({ dbId, id, main, desc, icon }) => {
  return {
    parent: {
      database_id: dbId,
    },
    properties: {
      id: {
        title: [
          {
            text: {
              content: id,
            },
          },
        ],
      },
      main: {
        rich_text: [
          {
            text: {
              content: main,
            },
          },
        ],
      },
      desc: {
        rich_text: [
          {
            text: {
              content: desc,
            },
          },
        ],
      },
      icon: {
        rich_text: [
          {
            text: {
              content: icon,
            },
          },
        ],
      },
    },
  };
};

module.exports = { notionParam };
