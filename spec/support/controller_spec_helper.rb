module ControllerSpecHelper
  #generates tokens for testing purposes
  # generate tokens from user id
  def token_generator()
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ1UDN5allFQURpSk5PRmYxV3RWdmRobm02enZNTWpwZ3dVbkpnbVJjUjIwIn0.eyJqdGkiOiJjZWZlOWRhOC1mMDM5LTRmNDItOGRiNS02NGVhYTk1OGY2M2QiLCJleHAiOjE1MDc5OTEzMTQsIm5iZiI6MCwiaWF0IjoxNTA3OTkxMDE0LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMvZGVtbyIsImF1ZCI6InRhbGVudC10b29sLWZyb250ZW5kIiwic3ViIjoiZGNmOWI0NzgtMWQ0My00NzQyLWFhN2EtMmIwNDkzNjZhZDViIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoidGFsZW50LXRvb2wtZnJvbnRlbmQiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiIwMmRiOTgxYi05MDBjLTQ0MGYtYjNhNC05N2VkNTg3MzRhMWUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsidW1hX2F1dGhvcml6YXRpb24iLCJhcHBfYWRtaW4iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0ZXN0LXVzZXIifQ.GHU5uder_Vsb_HMDF0eQFyNmmg77bDVhZ_VcOxO2LPx6i_ISMmjS2X7MMaMe2nL13tphgRIcc277VNctLUsNLG4eDJiAvZ9qm8ZoEe44HSX8iRjhRH5MCOrYKfy074KQ0onJl6Ot2jPkvYpPIUQ9qeHB97J-jNmL2WcmA93zvKQ8Sqj6Q7M5fFTpmUNFVP17trUaIovJx1b05rlgfGOBa1CcidLB4axy1aSXTa5Dkh7oBLpa9ycgDR0Q8ar5oIW__VDShZC4UILfIl5Rd6w68mqJ_k3DvwP85vMwjITcY2nMlHLFMth6S_L2a357rK2181GMyBk0w5MvpOtWCWzUkw"
  end

  def invalid_token_generator()
    "some invalid token"
  end


  # generate expired tokens from user id
  def expired_token_generator(user_id)
    JsonWebToken.encode({ user_id: user_id }, (Time.now.to_i - 10))
  end

  # return valid headers
  def valid_headers
    {
      "Authorization" => token_generator(),
      "Content-Type" => "application/json"
    }
  end

  # return invalid headers
  def invalid_headers
    {
      "Authorization" => nil,
      "Content-Type" => "application/json"
    }
  end
end
