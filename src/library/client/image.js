const filterContentEditor = (a) => {
    console.log(a);
    const result = a?.replace(/<img([^>]*)>/g, (match, group) => {
      group = group.replace(/\s*sizes="[^"]*"/, ""); // Remove sizes default attribute
      return `<img${group} sizes="(min-width: 450px) 100vw, 25vw" loading="lazy"/>`;
    });
    return result;
  };