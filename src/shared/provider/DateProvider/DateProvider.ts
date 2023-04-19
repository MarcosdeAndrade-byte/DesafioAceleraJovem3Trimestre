// Tipo criado para Tipar função adjustDateForLocalTimezone
type objectTimeZone = {
  created_at: Date;
  updated_at: Date;
};

// Função para padronização das datas
function adjustDateForLocalTimezone(date: Date): objectTimeZone {
  const offset = date.getTimezoneOffset();

  return {
    created_at: new Date(date.getTime() - offset * 60 * 1000),
    updated_at: new Date(date.getTime() - offset * 60 * 1000),
  };
}

export { adjustDateForLocalTimezone };
