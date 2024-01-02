export interface ShareData {
	title: string;
	text: string;
	url: string;
}

export function navigatorShare(node: HTMLElement, { data }: { data: ShareData }) {
	async function handleShare() {
		try {
			navigator.share(data);

			node.dispatchEvent(
				new CustomEvent("shareSuccess", {
					bubbles: true
				})
			);
		} catch (error) {
			node.dispatchEvent(
				new CustomEvent("shareError", {
					bubbles: true,
					detail: error
				})
			);
			alert("Error sharing using navigator.share");
		}
	}

	node.addEventListener("click", handleShare);

	return {
		destroy() {
			node.removeEventListener("click", handleShare);
		}
	};
}
