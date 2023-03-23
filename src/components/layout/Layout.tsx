import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
  useState,
} from "react";
import CreateModal from "../CreateModal";
import BottomNav from "./BottomNav";
import Header from "./Header";

export default function Layout(props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
}) {
  const [isCreateMode, setIsCreateMode] = useState(false);

  const toggleCreateMode = (): void => {
    setIsCreateMode(!isCreateMode);
  };
  return (
    <div className="h-screen w-screen bg-gray-100">
      <Header />
      <div className="h-screen w-screen flex justify-center items-center py-3">
        <div className="h-full w-full p-4 m-3 bg-white rounded-md">
          {props.children}
        </div>
      </div>
      {!isCreateMode && <BottomNav toggleCreatedMode={toggleCreateMode} />}
      {isCreateMode && <CreateModal toggleCreatedMode={toggleCreateMode} />}
    </div>
  );
}
