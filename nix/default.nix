{ nixpkgs ? import ./nixpkgs.nix
}:

with import nixpkgs {
  overlays = [];
  config = {
    allowUnfree = true;
    allowBroken = false;
  };
};
let
  inheritance = stdenv.mkDerivation {
    name = "inheritance";
    buildInputs = [
      nodejs
      nodePackages.typescript
    ];

    src = ../.;

    buildPhase = ''
      npm run build-all
    '';

    installPhase = ''
        mkdir -p $out/bin
        cp built.js $out/bin
        cp -R assets $out/bin
        cp index.html $out/bin
        cp server.js $out/bin
    '';

    meta = with stdenv.lib; {
      description = "The Prototype Inheritance";
    };
  };
in
{
  inherit inheritance;
}
