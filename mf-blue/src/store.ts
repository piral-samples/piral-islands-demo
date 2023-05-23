const defaultInit: { items: Array<string> } = { items: [] };

function storeHandler(api: any, init = defaultInit) {
  const items: Array<string> = [...init.items];

  return {
    update(item: string) {
      items.push(item);
      api.emit("added-item", { items });
    },
    get() {
      return {
        items,
        count: items.length,
      };
    },
  };
}

export default storeHandler;
