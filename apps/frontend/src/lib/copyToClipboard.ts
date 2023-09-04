export function clickToCopy(
	node: HTMLElement,
	{ url, callback }: { url?: string; callback?: () => void }
) {
	async function copyText() {
		const text = url ? url : node.innerText;

		try {
			await navigator.clipboard.writeText(text);

			node.dispatchEvent(
				new CustomEvent("copysuccess", {
					bubbles: true
				})
			);
			callback?.();
		} catch (error) {
			node.dispatchEvent(
				new CustomEvent("copyerror", {
					bubbles: true,
					detail: error
				})
			);
			alert("Error copying to clipboard");
		}
	}

	node.addEventListener("click", copyText);

	return {
		destroy() {
			node.removeEventListener("click", copyText);
		}
	};
}
