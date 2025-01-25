import LiveTv from "./LiveTv";
import Trending from "./trending/Trending";
import OwnState from "./OwnState/OwnState";
import AddRightHome1 from "./shared/AddRightHome1";
import LiveCricket from "./LiveCricket/LiveCricket";
import Shorts from "./shorts/Shorts";

export default function RightHome() {
  return (
    <div>
      <LiveTv />
      <Trending/>
      <OwnState/>
      <AddRightHome1/>
      <LiveCricket/>
      <Shorts/>
    </div>
  );
}
