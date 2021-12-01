import { Ref, useEffect } from "react";
import { entities, setup } from "../Animation/entities";

const useSetupReferences = (
  circleReference: any,
  leftPaneReference: any,
  rightPaneReference: any,
  animationEntities: any
): void => {
  useEffect(() => {
    if (
      [
        circleReference,
        leftPaneReference,
        rightPaneReference,
        animationEntities,
      ].every((ref) => ref.current !== undefined)
    ) {
      setup(
        circleReference as Ref<HTMLDivElement>,
        leftPaneReference as Ref<HTMLDivElement>,
        rightPaneReference as Ref<HTMLDivElement>,
        (animationEntities.current as any).entities,
        entities.entities
        // setAnimationEntities
      );
    }
  }, [
    animationEntities,
    circleReference,
    leftPaneReference,
    rightPaneReference,
  ]);
};

export { useSetupReferences };
export default useSetupReferences;
