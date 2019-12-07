{ nixpkgs ? import ./nixpkgs.nix
}:

with rec {
  overlay = import ./overlay.nix {};

  pkgs = import nixpkgs {
    overlays = [ overlay ];
    config = {
      allowUnfree = true;
      allowBroken = false;
    };
  };

  clean = import ./cleanTypescript.nix { inherit (pkgs) lib; };

  inheritance = pkgs.stdenv.mkDerivation {
    name = "inheritance";
    buildInputs = with pkgs; [
      makeWrapper

      nodejs
      nodePackages.typescript
      nodePackages.live-server
    ];

    src = clean ../.;

    buildPhase = "npm run build-all";

    installPhase = ''
      mkdir -p $out/bin
      cp built.js $out
      cp -R assets $out
      cp *.css $out
      cp *.html $out

      makeWrapper \
        ${pkgs.nodePackages.live-server}/bin/live-server \
        $out/bin/inheritance \
        --add-flags "$out"
    '';

    meta = with pkgs.stdenv.lib; {
      description = "The Prototype Inheritance";
    };
  };
};
{
  inherit inheritance;
}
