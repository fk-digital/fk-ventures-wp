// Color Picker
acf.add_filter('color_picker_args', function (args, field) {
  console.log('color_picker_args loading')
  // do something to args
  args.palettes = ['#FFD350', '#EB5911', '#3261C0']
  // return
  return args
})
