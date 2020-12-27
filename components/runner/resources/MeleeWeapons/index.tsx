import meleeData from "../../../../data/melee"
import { useRunnerAccess } from "../../../../hooks/useRunnerAccess"
import { GearWeaponMelee } from "../../../../types/Resources"
import { MeleeWeaponTable } from "./MeleeWeaponTable"
import { AddMeleeWeaponButton } from "./MeleeWeaponTable/AddMeleeWeaponButton"
import { CircularProgress } from "@material-ui/core"
import { RemainingNuyen } from "../RemainingNuyen"
import { ResourceBreadCrumbs } from "../ResourceBreadCrumbs"
import { RemoveMeleeWeaponButton } from "./MeleeWeaponTable/RemoveMeleeWeaponButton"
import { gearPageReducerGenerator } from "../ulti"

export type Payload = GearWeaponMelee | number

export const MeleeWeapons = () => {
  const [runner, dispatch] = useRunnerAccess<undefined, Payload>(
    gearPageReducerGenerator("melee"),
  )
  return runner ? (
    <>
      <ResourceBreadCrumbs activePage="Melee Weapons" />
      <RemainingNuyen runner={runner} />
      <MeleeWeaponTable
        weapons={meleeData}
        dispatch={dispatch}
        ActionButton={AddMeleeWeaponButton}
      />
      {runner.resources?.melee && (
        <>
          <h2>Purchased Melee Weapons</h2>
          <MeleeWeaponTable
            weapons={runner.resources.melee}
            dispatch={dispatch}
            ActionButton={RemoveMeleeWeaponButton}
          />
        </>
      )}
    </>
  ) : (
    <CircularProgress />
  )
}

export default MeleeWeapons
