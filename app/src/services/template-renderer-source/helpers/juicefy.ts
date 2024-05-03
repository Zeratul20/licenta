import juice from "juice";

export const juicefy = async (html:any,css:any) => {
    return await juice.inlineContent(html,css,{
      removeStyleTags: false,
      webResources: {
        images: false
      }
    });
  };