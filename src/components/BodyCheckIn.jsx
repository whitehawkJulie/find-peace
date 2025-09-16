const BodyCheckIn = () => {
	return (
		<div className="optional-card">
			<span className="invitation-badge">✨ Invitation</span>
			<h2>Pause and check in with your body</h2>
			<p>Before naming your feelings, take a quiet moment to notice what’s happening inside.</p>
			<ul>
				<li>Close your eyes if you’re comfortable</li>
				<li>Notice any tension, flutter, heaviness, tightness, lightness</li>
				<li>You don't need to go looking for anything ... just notice what's already there.</li>
			</ul>
			<p>This moment of pause can help you connect with what's *really* happening underneath the surface.</p>
		</div>
	);
};

BodyCheckIn.title = "Body Check-In";
BodyCheckIn.helpContent =
	"Before we can name our feelings, it helps to notice what's happening in our body. This short pause supports emotional clarity.";

export default BodyCheckIn;
