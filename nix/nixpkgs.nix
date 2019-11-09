let
  fetchNixpkgs = { owner, repo, rev, sha256 }:
    builtins.fetchTarball {
      url = "https://github.com/${owner}/${repo}/archive/${rev}.tar.gz";
      inherit sha256;
    };
in
  fetchNixpkgs {
    owner = "nixos";
    repo = "nixpkgs";
    rev = "d2d009f4a6b930678c65f5ed13a4f48b3575e2a4";
    sha256 = "171yqv7hwsmya42jv8sj2a124x4fd7wpbhvd6nh045lr5l8mcwrq";
  }
