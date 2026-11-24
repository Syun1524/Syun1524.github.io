function isSeriesList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((name: unknown) => typeof name === 'string');
}

export function initEntryFilters(typeParameter?: 'category' | 'type') {
  const search = document.querySelector<HTMLInputElement>('#search');
  const type = typeParameter ? document.querySelector<HTMLSelectElement>(`#${typeParameter}`) : null;
  const series = document.querySelector<HTMLSelectElement>('#series');
  const filters = document.querySelector<HTMLElement>('#filters');
  const count = document.querySelector<HTMLElement>('#results-count');
  const empty = document.querySelector<HTMLElement>('#empty-state');
  if (!search || !series || !filters || !count || !empty || (typeParameter && !type)) {
    throw new Error('筛选界面缺少必要控件。');
  }
  const controls = { search, type, series, filters, count, empty };
  const cards = [...document.querySelectorAll<HTMLElement>('[data-entry]')].map(element => {
    const names: unknown = JSON.parse(element.dataset.seriesList ?? 'null');
    if (!isSeriesList(names)) {
      throw new Error('条目的所属作品数据无效。');
    }
    if (typeof element.dataset.search !== 'string') throw new Error('条目的搜索数据无效。');
    return { element, names };
  });
  const params = new URLSearchParams(location.search);
  if (controls.type && typeParameter) controls.type.value = params.get(typeParameter) ?? '';
  const selectedSeries = params.get('series');
  if (selectedSeries && ![...controls.series.options].some(option => option.value === selectedSeries)) {
    controls.series.add(new Option(selectedSeries, selectedSeries));
  }
  controls.series.value = selectedSeries ?? '';
  controls.search.value = params.get('q') ?? '';
  function filterEntries() {
    const query = controls.search.value.trim().toLocaleLowerCase('zh-CN');
    let visible = 0;
    for (const { element, names } of cards) {
      element.hidden = !(element.dataset.search?.includes(query)
        && (!controls.type?.value || element.dataset.kind === controls.type.value)
        && (!controls.series.value || names.includes(controls.series.value)));
      if (!element.hidden) visible++;
    }
    controls.count.textContent = `共 ${visible} 个条目`;
    controls.empty.hidden = visible !== 0;
    const next = new URLSearchParams();
    if (query) next.set('q', query);
    if (controls.type?.value && typeParameter) next.set(typeParameter, controls.type.value);
    if (controls.series.value) next.set('series', controls.series.value);
    history.replaceState(null, '', `${location.pathname}${next.size ? `?${next}` : ''}`);
  }
  controls.search.addEventListener('input', filterEntries);
  controls.type?.addEventListener('change', filterEntries);
  controls.series.addEventListener('change', filterEntries);
  filterEntries();
  controls.filters.hidden = false;
}
