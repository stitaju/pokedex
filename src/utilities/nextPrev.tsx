export const nextPokemon = (
  setIndex: React.Dispatch<React.SetStateAction<number>>,
  listItemRefs: React.RefObject<HTMLLIElement[]>
) => {
  setIndex((prev) => {
    const newIndex = Math.min(
      prev + 1,
      listItemRefs.current.length - 1
    );
    listItemRefs.current[newIndex]?.click();
    listItemRefs.current[newIndex]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
    });

    return newIndex;
  });
};

export const prevPokemon = (
  setIndex: React.Dispatch<React.SetStateAction<number>>,
  listItemRefs: React.RefObject<HTMLLIElement[]>
) => {
  setIndex((prev) => {
    const newIndex = Math.max(prev - 1, 0);
    listItemRefs.current[newIndex]?.click();
    listItemRefs.current[newIndex]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
    });

    return newIndex;
  });
};
