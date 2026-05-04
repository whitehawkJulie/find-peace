import { useState, useEffect } from "react";

export function useScrollIndicator(ref) {
	const [hasMoreBelow, setHasMoreBelow] = useState(false);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const check = () => {
			setHasMoreBelow(
				el.scrollHeight > el.clientHeight + 10 &&
				el.scrollTop + el.clientHeight < el.scrollHeight - 10
			);
		};
		check();
		el.addEventListener("scroll", check);
		const ro = new ResizeObserver(check);
		ro.observe(el);
		return () => {
			el.removeEventListener("scroll", check);
			ro.disconnect();
		};
	}, [ref]);
	return hasMoreBelow;
}
