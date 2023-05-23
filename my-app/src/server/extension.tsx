import * as React from "react";
import { PiralComponent } from "./PiralComponent";
import { Registry, MfComponentProps } from "./types";

export function makeComponent(
  registry: Registry
): React.ComponentType<MfComponentProps> {
  return ({ name, params }) => {
    const components = React.useMemo(
      () => registry.components.get(name) || [],
      [name]
    );

    return (
      <piral-slot name={name} params={JSON.stringify(params)}>
        {components.map((ref, i) => (
          <PiralComponent key={i} params={params} component={ref} />
        ))}
      </piral-slot>
    );
  };
}
