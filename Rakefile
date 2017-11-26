desc "build a release file"
task :build do
  sh "rm -fr build"
  sh "mkdir build"
  sh "zip -r build/proxyswitcheroo.zip ./ -x \*.git/\*"
end
