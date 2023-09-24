import { writable, get } from "svelte/store";

interface CurrSectionStore {
	sections:
		| {
				section: string;
				active: boolean;
		  }[]
		| null;
	curr: string | null;
}

export const currSection = writable<Record<string, CurrSectionStore>>({});

export function initCurrSection(key: string, sections: string[]) {
	if (sections.length === 0) {
		return;
	}
	const currSectionObj = {
		curr: null,
		sections: sections.map((section) => ({
			section,
			active: false
		}))
	};
	if (key in get(currSection)) {
		return;
	}
	currSection.update((state) => ({
		...state,
		[key]: currSectionObj
	}));
}

export function addSection(key: string, section: string) {
	const sections = get(currSection)?.[key]?.sections ?? null;
	if (sections === null) {
		return;
	}
	// find the index of the section
	// if it doesn't exist, return
	// if it does, set it to active
	const index = sections.findIndex((s) => s.section === section);
	if (index === -1) {
		return;
	}
	currSection.update((state) => {
		const pageSection = state?.[key]?.sections ?? null;
		if (pageSection === null) {
			return state;
		}
		pageSection[index].active = true;
		return state;
	});
	updateCurrSection(key);
}

export function removeSection(key: string, section: string) {
	const sections = get(currSection)?.[key]?.sections ?? null;
	if (sections === null) {
		return;
	}
	// find the index of the section
	// if it doesn't exist, return
	// if it does, set it to inactive

	const index = sections.findIndex((s) => s.section === section);
	if (index === -1) {
		return;
	}
	currSection.update((state) => {
		const pageSection = state?.[key]?.sections;
		if (pageSection === null) {
			return state;
		}
		pageSection[index].active = false;
		return state;
	});
	updateCurrSection(key);
}

export function updateCurrSection(key: string) {
	// get the latest active sections
	// if there are none, return
	// if there are, set the curr sections

	const sections = get(currSection)?.[key]?.sections ?? null;
	if (sections === null) {
		return;
	}
	const activeSections = sections.filter((s) => s.active);
	if (activeSections.length === 0) {
		return;
	}
	currSection.update((state) => {
		const pageSection = state?.[key] ?? null;
		if (pageSection === null) {
			return state;
		}
		pageSection.curr = activeSections[activeSections.length - 1].section;
		return state;
	});
}
