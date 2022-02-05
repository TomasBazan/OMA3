import { mods } from "@/data/firearms"
import { useRunnerAccess } from "@/hooks/useRunnerAccess"
import { FirearmMod } from "@/types/Resources"
import { CircularProgress, Grid } from "@mui/material"
import { useRouter } from "next/router"
import { GearTable } from "../../GearPageTemplate/GearTable"
import { ResourceBreadCrumbs } from "../../GearPageTemplate/ResourceBreadCrumbs"
import { Columns, DispatchContext, gearTableConfigOptions } from "../../util"

const buyModCol: Columns<FirearmMod>[] = [
  gearTableConfigOptions.buy,
  gearTableConfigOptions.name,
  {
    display: (gear) =>
      gear.useAs.map(({ slot }) => slot || "INTEGRAL").join(", "),
    label: "Slot",
  },
  gearTableConfigOptions.avail,
  gearTableConfigOptions.cost,
]

export const FirearmMods = () => {
  const { query } = useRouter(),
    gearIndex = +query.gearIndex,
    [runner, dispatch] = useRunnerAccess<FirearmMod>((runner, { payload }) => ({
      ...runner,
      resources: {
        ...runner.resources,
        firearms: [
          ...runner.resources.firearms.slice(0, gearIndex),
          {
            ...runner.resources.firearms[gearIndex],
            mods: [
              ...(runner.resources.firearms[gearIndex].mods ?? []),
              payload,
            ],
          },
          ...runner.resources.firearms.slice(gearIndex + 1),
        ],
      },
    }))
  return runner ? (
    <>
      <ResourceBreadCrumbs
        activePage={`${runner.resources.firearms[gearIndex].name} (${gearIndex})`}
        previousPage={{
          label: "Firearms",
          categoryPath: "firearms",
        }}
      />
      <DispatchContext.Provider value={dispatch}>
        <Grid item md={6}>
          <GearTable listOfGear={mods} cols={buyModCol} />
        </Grid>
      </DispatchContext.Provider>
    </>
  ) : (
    <CircularProgress />
  )
}
