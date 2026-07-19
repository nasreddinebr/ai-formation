export interface SearchEntry {
  id: string;
  moduleId: number;
  moduleTitle: string;
  sectionId: string;
  sectionTitle: string;
  snippet: string;
}

export class SearchIndex {
  private entries: SearchEntry[];

  constructor(entries: SearchEntry[]) {
    this.entries = entries;
  }

  search(query: string): SearchEntry[] {
    const normalizedQuery = query.toLowerCase().trim();
    if (normalizedQuery.length < 2) return [];

    const terms = normalizedQuery.split(/\s+/);

    return this.entries
      .map((entry) => {
        const searchText = `${entry.moduleTitle} ${entry.sectionTitle} ${entry.snippet}`.toLowerCase();
        let score = 0;

        for (const term of terms) {
          if (searchText.includes(term)) {
            score += 1;
            if (entry.sectionTitle.toLowerCase().includes(term)) score += 2;
            if (entry.moduleTitle.toLowerCase().includes(term)) score += 3;
          }
        }

        return { entry, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(({ entry }) => entry);
  }
}
