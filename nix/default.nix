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

  inheritance = with pkgs; stdenv.mkDerivation {
    name = "inheritance";
    buildInputs = [
      nodejs
      nodePackages.typescript
    ];

    src = clean ../.;

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
};
{
  inherit inheritance;
}
