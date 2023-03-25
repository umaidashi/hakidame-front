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
    <div className="flex items-center flex-col h-full min-h-screen w-screen bg-gray-100 pb-[62px]">
      <Header />
      <div className="h-full w-screen max-w-[400px] flex justify-center items-center pb-3">
        <div className="h-full w-screen p-4 m-3 bg-white rounded-md">
          {props.children}
        </div>
      </div>
      {!isCreateMode && <BottomNav toggleCreatedMode={toggleCreateMode} />}
      {isCreateMode && <CreateModal toggleCreatedMode={toggleCreateMode} />}
    </div>
  );
}
