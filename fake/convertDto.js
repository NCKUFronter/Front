const self = (x) => x;

function record(dto, user, req) {
  dto.reviseDate = new Date().toISOString();
  dto.userId = user._id;
  if (req.params.ledgerId) {
    dto.ledgerId = req.params.ledgerId;
  }
  return dto;
}

function ledger(dto, user, req) {
  if (method == "POST") {
    dto.adminId = user._id;
    dto.userIds = [user._id];
  }
  return dto;
}

function user(dto) {
  dto.rewardPoints = 0;
  dto.picture = "";
  return dto;
}

module.exports = {
  record,
  category: self,
  ledger,
  user,
  self,
};
