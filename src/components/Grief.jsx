import React from "react";
import HelpLink from "./HelpLink";

const Grief = () => {
	return (
		<div className="step-container">
			<>
				<p>
					Sometimes in this process, a need comes into view that hasn’t been met for a long time — or perhaps
					ever. When that happens, it’s very natural for grief to arise.
				</p>

				<p>
					If that’s what you’re noticing, this page is simply a place to slow down and make some space for
					that.
				</p>

				<p>Before going further, you might gently check:</p>

				<ul>
					<li>Am I holding onto one particular way this need has to be met?</li>
					<li>Am I believing there is only one path forward?</li>
				</ul>

				<p>Sometimes, just loosening your grip on a specific strategy is enough for something new to open.</p>

				<p>
					If this need feels more deeply unmet — not just here, but more broadly — you might try one of these:
				</p>

				<h3>Sit with it</h3>
				<p>
					You might simply spend some time with this need. Let yourself feel it, wonder about it, and allow it
					to unfold without needing to solve it right away.
				</p>

				<p>
					<em>
						You can read more about <HelpLink topic="mourning">connecting with and mourning</HelpLink> unmet
						needs.
					</em>
				</p>

				<h3>Try giving it</h3>
				<p>
					Sometimes, when a need feels out of reach, offering it to someone else can bring unexpected clarity
					— helping you understand what it really means and how it might live in your life.
				</p>

				<p>And if nothing feels clear yet, that’s okay.</p>

				<p>
					Even if you can’t see how this need could be met right now, you don’t know what the future holds.
					You can still honour the need, let it matter, and hold it gently while things unfold.
				</p>
			</>

			<p>
				The incredibly <strong>good</strong> news here is that you now know precisely what's been causing you
				pain all this time. And now you can be much more clear in finding ways to meet that need.
			</p>
		</div>
	);
};

Grief.title = "Grief and Mourning";
Grief.titleSweary = "When it just feels shit";
Grief.navTitle = "Grief";

export default Grief;
