import React from "react";
import HelpLink from "./HelpLink";

const Grief = () => {
	return (
		<div className="step-container">
			<p>
				Sometimes, in this process, a need comes into view that hasn’t been met for a long time — or perhaps
				ever. When that happens, it’s natural for strong feelings to arise, like grief or anger.
			</p>

			<p>
				If that’s what you’re noticing, this page is simply a place to slow down and make some space for that.
			</p>

			<p className="help-callout">
				If you’d like more{" "}
				<HelpLink topic="mourning">
					support with this, or ways to engage with it, you can find that here
				</HelpLink>
				.
			</p>
		</div>
	);
};

Grief.title = "Grief and Mourning";
Grief.titleSweary = "When it just feels shit";
Grief.navTitle = "Grief";

export default Grief;
