import React from "react";
import { useWizard } from "./WizardContext";

const NeedsUnmet = () => {
	const { needs } = useWizard();

	// Filter for unmet needs
	const unmetNeeds = Object.entries(needs)
		.filter(([_, status]) => status === "clicked")
		.map(([need]) => need);

	return (
		<>
			{unmetNeeds.length > 0 ? (
				<div className="pill-grid cloud">
					{unmetNeeds.map((need) => (
						<div key={need} className="pill clicked need" title="Unmet need">
							{need}
						</div>
					))}
				</div>
			) : (
				<p>
					<em>No unmet needs selected.</em>
				</p>
			)}

			<p>
				Here are the needs that weren't fully met for you in that moment. Take a moment to just
				notice them — not as problems to fix, but as important parts of who you are.
			</p>
			<p>
				Do any of these feel familiar? Needs that keep showing up — that you keep getting triggered
				around — may be what we call <strong>"black hole needs"</strong>: deeply unmet needs, often
				from way back, that pull everything towards them. If you notice one, that's actually
				valuable information. It means the real work might not be about this particular situation at
				all.
			</p>
			<p>
				On the next step, you'll have a chance to explore these needs more deeply — to sit with
				them, and discover what they're really telling you.
			</p>
		</>
	);
};

NeedsUnmet.title = "Needs that are NOT met";

NeedsUnmet.helpContent = (
	<>
		<p>These are the needs you've identified as unmet in this situation.</p>
		<p>
			If you feel self-righteous about having a need met, rather than a sense of relief at having
			named it, there may be deeper needs underneath. Ask yourself: "If that need was met, then
			what would I have?" Keep going until you find one that really "lands."
		</p>
		<h4>Black hole needs</h4>
		<p>
			Some needs come up again and again in our lives. We get triggered around them repeatedly,
			often intensely, and we may have built up a whole set of "tragic strategies" around them —
			things we do to try to get the need met that actually aren't helping (people-pleasing,
			withdrawing, controlling, overworking, etc.).
		</p>
		<p>
			These "black hole needs" are usually deeply unmet from childhood or early life. They pull
			so strongly that every new situation gets sucked in — and it can feel like the other person
			is causing all this pain. But often, the pain pre-existed this incident. The other person
			may have touched the wound, but they didn't create it.
		</p>
		<p>
			Recognising a black hole need is a gift. It means the OFNR process isn't just about fixing
			this one situation — it's about uncovering something that needs attention in your life
			regardless. And that's where real, lasting change can happen.
		</p>
		<p>
			The good news is that needs aren't tied to any one person, place or time. We can get them
			met in many, many ways!
		</p>
	</>
);

export default NeedsUnmet;
