import fs from 'fs'
import { CliArgs } from './utils/cli'
import slugify from 'slugify'
export function sandbox(args: CliArgs) {
  const { workdir } = args

  for (const depute of readAllDeputesJsonFromNosdeputes()) {
    const oldSlug = depute.slug
    slugify.extend({ "'": '-', '/': '-' })
    const mySlug = slugify(depute.nom, { lower: true, locale: 'fr' })

    if (oldSlug !== mySlug) {
      console.log('Problem with this one', depute.nom, oldSlug, '!=', mySlug)
    }
  }

  // const subdir = path.join(workdir, AM030, 'acteurs')
  // const files = readFilesInSubdir(subdir)
  // for (const f of files) {
  //   const json = readFileAsJson(path.join(subdir, f))
  //   json.mandats.forEach((mandat: any) => {
  //     const { organesRefs } = mandat
  //     if ((organesRefs.length = 1)) {
  //       console.log(
  //         `acteur ${json.uid} has mandat ${mandat.uid} ${mandat.xsiType} with organeRefs ${organesRefs}`,
  //       )
  //     }
  //   })
  // }
}

function readFilesInSubdir(subDir: string): string[] {
  console.log(`Reading files in ${subDir}`)
  const filenames = fs.readdirSync(subDir)
  console.log(`${filenames.length} files found`)
  return filenames
}

function readFileAsJson(filePath: string): any {
  return JSON.parse(
    fs.readFileSync(filePath, {
      encoding: 'utf8',
    }),
  )
}

function readAllDeputesJsonFromNosdeputes(): any[] {
  return [13, 14, 15, 16].map(readDeputesJsonFromNosDeputes).flat()
}

function readDeputesJsonFromNosDeputes(legislature: number) {
  return readFileAsJson(
    `./other/nosdeputes_deputes${legislature}.json`,
  ).deputes.map((_: any) => _.depute)
}
