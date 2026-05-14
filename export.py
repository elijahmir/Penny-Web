import bpy

bpy.ops.wm.open_mainfile(filepath='/Users/elijahmirandilla/Developer/elijahmir/Penny Landing Page/public/models/iphone_penny.blend')

export_path = '/Users/elijahmirandilla/Developer/elijahmir/Penny Landing Page/public/models/iphone_penny_final.glb'
bpy.ops.export_scene.gltf(
    filepath=export_path,
    export_format='GLB',
    export_apply=True,
    export_yup=True
)
print(f"Exported to {export_path}")
