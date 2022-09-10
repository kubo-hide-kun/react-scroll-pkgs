# USAGE: ルートディレクトリで実行すること

# rm ./apps/website/public/assets/first_view_pc/＊
# ffmpeg -i movie.mp4 -r 8 -q:v 1 ./apps/website/public/assets/first_view_pc/%03d.jpg

target_dir="./public/assets/first_view_pc"

function get_last_dir() {
  path=$1

  array=( `echo $path | tr -s '/' ' '`)
  last_index=`expr ${#array[@]} - 1`
  echo ${array[${last_index}]}
  return 0
}

for file in ./apps/website/public/assets/first_view_pc/*.jpg
do
  jpegoptim -m90 --strip-all "$file"

  file_name=`get_last_dir $file`
  npm run -w apps/website convert2avif "${target_dir}/${file_name}" -- -d "${target_dir}"
  npm run -w apps/website convert2webp "${target_dir}/${file_name}" -- -d "${target_dir}"
done
